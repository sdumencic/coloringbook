import process from "process";

export default () => !process.env.NODE_ENV || process.env.NODE_ENV === "development";
