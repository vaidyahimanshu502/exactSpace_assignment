const fs = require('fs');  
const path = require('path');

const loggerDirectory = './loggers'; // Acessing my log file from my loggers directory

fs.readdir(loggerDirectory, (err, files) => {
  if (err) {
    console.error('An error occured while reading logger directory:', err);
    return;
  }

  let largest_logger_file = '';
  let largest_logger_file_size = 0;

  files.forEach(file => {
    if (file.endsWith('.log')) {
      const filePath = path.join(loggerDirectory, file);
      const stats = fs.statSync(filePath);                //Getting informations of required file

      if (stats.isFile() && stats.size > largest_logger_file_siz) {
        largest_logger_file_size = stats.size;
        largest_logger_file = filePath;
      }
    }
  });

  //truncating largestFile to 100 lines.
  if (largest_logger_file) {
    fs.readFile(largest_logger_file, 'utf8', (err, data) => {
      if (err) {
        console.error('An error occured while reading the largest log file:', err);
        return;
      }

      const lines = data.split('\n').slice(0, 100).join('\n');
      fs.writeFile(largest_logger_file, lines, 'utf8', (err) => {
        if (err) {
          console.error('An error occured while truncating the largest log file:', err);
          return;
        }
        console.log('Truncated the largest log file to 100 lines.');
      });
    });
  } else {
    console.log('No log files found.');
  }
});