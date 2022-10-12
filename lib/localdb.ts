import PouchDB from "pouchdb";

export const db = new PouchDB("minutes-logs");

export type Log = {
  date: string;
  json: any;
  _id?: string;
  _rev?: string;
  user_id?: string;
  created_at?: string;
  updated_at?: Date;
  unique_id?: string;
};

export const addLogs = async (logs: Log[]) => {
  try {
    const result = await db.bulkDocs([...logs]);
  } catch (err) {
    console.log(err);
  }
};

export const addLog = async (log: Log) => {
  try {
    const newLog = await db.post(log);

    return newLog;
  } catch (err) {
    console.log(err);
  }
};

export const updateLog = async (log: Log) => {
  try {
    const response = await db.put(log);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getAllLogs = async () => {
  try {
    const result = await db.allDocs({
      include_docs: true,
    });
    return result?.rows;
  } catch (err) {
    console.log(err);
  }
};

export const deleteLogs = async () => {
  try {
    await db.destroy();
  } catch (err) {
    console.log(err);
  }
};

export const deleteLog = async (id: string, rev: string) => {
  try {
    await db.remove(id, rev);
  } catch (err) {
    console.log(err);
  }
};
