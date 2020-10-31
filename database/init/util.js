const csv = require('csv-parser');
const fs = require('fs');
const getJSON = require('get-json');
var GenderApi = require('gender-api.com-client');
var genderApiClient = new GenderApi.Client('APsMltsXkZzwStmLYV');

const results = [];

var preprocess = function (listt, set) {
  listt = listt.split(',');
  listt.forEach((location) => {
    location = location.replace(/[,.\/]/g, '');
    set.add(location.toLowerCase());
  });
};

//0 for male
//1 for female
//2 for others
//3 for unknown

var getGender = async function (name) {
  let retval = 3;
  try {
    //var response = await getJSON('https://gender-api.com/get?key=APsMltsXkZzwStmLYV&name='+name);
    var response = await genderApiClient.getByFirstName(name);
    if (response.accuracy < 60) {
      retval = 3;
    }
    else if (response.gender === 'male') {
      retval = 0;
    }
    else if (response.gender === 'female') {
      retval = 1;
    }
    else
      retval = 2;
  }
  catch (error) {
    console.log(error);
  }
  return retval;
}

fs.createReadStream('./database/init/init_helper.csv')
  .pipe(csv())
  .on('data', (data) => {
    let single = {};
    single.name = data.Cooks;
    single.gender = 0;
    single.phoneNumber = data['Phone Number'];
    single.city = 'Bengaluru';
    single.roles = 1;
    single.locations = new Set();
    preprocess(data['Number'], single.locations);
    preprocess(data['Serviceable Areas'], single.locations);
    single.locations = Array.from(single.locations);
    single.createdAt = new Date();
    single.updatedAt = new Date();
    results.push(single);
  })
  .on('end', () => {
    console.log('Writing to a json file');
    let content = JSON.stringify(results);
    fs.writeFile('./helpers1.json', content, 'utf8', (err) => {
      if (err) {
        return console.log(err);
      }
      console.log('File written')
    });
  });