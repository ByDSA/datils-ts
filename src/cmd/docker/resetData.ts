import { questionYesNo } from "../cmd.ts";
import { upDetach } from "../docker-compose.ts";
import { Container, removeContainer, stopContainer } from "./container.ts";
import { Volume, removeVolume } from "./volume.ts";

type ResetDataParams = {
  volume: Volume;
  container: Container;
};
export default async function resetData( { volume, container }: ResetDataParams) {
  const sure = await questionYesNo("Are you sure?");

  if (sure) {
    try {
      await removeDB();
    } catch (e: any) {
      if (e.stderr.includes("Stop the container before")) {
        await stopContainer(container);

        try {
          await removeDB();
        } catch (e2: any) {
          if (!e2.stderr.includes("No such volume"))
            throw e2;
        }

        await startDB();
      } else if (e.stderr.includes("No such container"))

        await startDB();
    }
  }

  async function startDB() {
    await upDetach();
  }

  function removeDB() {
    return removeDBContainer().then(removeDBVolume);
  }

  function removeDBContainer() {
    return removeContainer(container);
  }

  function removeDBVolume() {
    return removeVolume(volume);
  }
}
