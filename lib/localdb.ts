import PouchDB from "pouchdb";

export const db = new PouchDB("minutes-logs");

export type Log = {
  date: string;
  json: any;
  _id?: string;
  _rev?: string;
  user_id?: string;
  created_at?: string;
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
    await db.put(log, { force: true });
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
