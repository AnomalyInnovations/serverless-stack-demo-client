import { Storage } from 'aws-amplify';

export const s3Upload = async (file: File) => {
  const filename = `${Date.now()}-${file.name}`;

  const stored = (await Storage.vault.put(filename, file, {
    contentType: file.type
  })) as { key: string };

  return stored.key;
};
