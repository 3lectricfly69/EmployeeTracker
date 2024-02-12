// read sql seed query
const seed = fs.readFileSync("./db/seeds.sql",{
    encoding: "utf-8",
});