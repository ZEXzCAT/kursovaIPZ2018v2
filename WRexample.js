var fs = require("fs");

fs.writeFile("hello.txt", "privet мир!", function(error) {

  if (error) throw error; // если возникла ошибка
  console.log("Асинхронная запись файла завершена. Содержимое файла:");
  var data = fs.readFileSync("hello.txt", "utf8");
  console.log(data); // выводим считанные данные
});
