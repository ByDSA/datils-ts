/* eslint-disable import/prefer-default-export */
import { $ } from "zx";
import { SudoParams } from "../params";

export type Volume = string;
type DockerVolumeParams = SudoParams & {
  volume: Volume;
};

function getVolumeFromParams(params: DockerVolumeParams | Volume): Volume {
  if (typeof params === "string")
    return params;

  return params.volume;
}

export function removeVolume(params: DockerVolumeParams | Volume) {
  const volume = getVolumeFromParams(params);

  return $`sudo docker volume rm ${volume}`;
}
