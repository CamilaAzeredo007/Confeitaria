import mongoose from "mongoose";

const url = "mongodb+srv://camilaazeredobg007_db_user:6D5Np4SjtPVEw33E@cluster0.m6jkcgr.mongodb.net/?appName=Cluster0";
const conexao = await mongoose.connect(url);

export default conexao;