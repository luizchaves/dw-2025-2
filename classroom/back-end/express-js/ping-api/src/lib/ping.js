import util from 'node:util';
import { exec } from 'node:child_process';

const execAsync = util.promisify(exec);

export async function pingHost(host, count = 3) {
  try {
    const command = `ping -c ${count} ${host}`;

    const { stdout } = await execAsync(command);

    return { ...pingToJSON(stdout), command: stdout };
  } catch (error) {
    if (error.message.includes('Unknown host')) {
      throw new Error("Unknown host");
    }

    throw new Error("Failed to ping host");
  }
}

function pingToJSON(output) {
  const ping = {};

  // ip
  let regex = /\(([\d\.]+)\)/;
  let match = output.match(regex);
  ping.ip = match[1];

  // packets
  ping.packets = [];
  regex = /icmp_seq=(?<seq>\d+) ttl=(?<ttl>\d+) time=(?<time>[\d\.]+)/g;
  while ((match = regex.exec(output))) {
    const {
      groups: { seq, ttl, time },
    } = match;

    ping.packets.push({
      seq: parseInt(seq),
      ttl: parseInt(ttl),
      time: parseFloat(time),
    });
  }

  // statistics
  regex =
    /(?<transmitted>\d+) packets transmitted, (?<received>\d+) (packets received|received)/;
  const {
    groups: { transmitted, received },
  } = output.match(regex);

  const lost = transmitted - received;

  regex =
    /min\/avg\/max\/(stddev|mdev) = (?<min>[\d.]+)\/(?<avg>[\d.]+)\/(?<max>[\d.]+)\/(?<stddev>[\d.]+)/;
  const {
    groups: { min, avg, max, stddev },
  } = output.match(regex);

  ping.statistics = {
    transmitted: parseInt(transmitted),
    received: parseInt(received),
    lost: lost,
    min: parseFloat(min),
    avg: parseFloat(avg),
    max: parseFloat(max),
    stddev: parseFloat(stddev),
  };

  return ping;
}
