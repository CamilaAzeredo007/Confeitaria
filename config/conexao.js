
import dns from 'node:dns';
import mongoose from 'mongoose';

dns.setServers(['8.8.8.8', '1.1.1.1']);

const url = "mongodb+srv://camilaazeredobg007_db_user:6D5Np4SjtPVEw33E@cluster0.m6jkcgr.mongodb.net/";

const conexao = await mongoose.connect(url);

export default conexao;