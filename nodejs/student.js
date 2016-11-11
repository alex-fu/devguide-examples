import couchbase from 'couchbase';
import uuid from 'uuid';


var connString = 'couchbase://localhost';

var cluster = new couchbase.Cluster(connString);

var bucket = cluster.openBucket('default');

if (bucket) {
    console.log('open `default` bucket succeed!');
} else {
    process.exit(1);
}

// check nodejs version
function verifyNodejsVersion() {
    return new Promise(
        (resolve, reject) => {
            console.log(process.version);
            if(parseInt(process.version.split("v")[1].substr(0, 1)) < 7) {
                console.log("nodejs version is lower than v4.0, please upgrade!");
                reject("nodejs version too low: " + process.version);
            } else {
                resolve();
            }
        }
    )
}
verifyNodejsVersion()
    .then(ret => console.log(ret))
    .catch(err => console.log(err));

// `student` schema
/**
 * {
 *   type: "student",
 *   name: "xxx",
 *   class: "N1-1",
 *   age:  20,
 *   grade: 99
 * }
 */

// insert some students
{
    let student = {
        type: "student",
        name: "fuyf",
        "class": "N1-1",
        age: 20,
        grade: 99
    };
    insertStudent(student)
        .catch(err => console.error(err));
}

function insertStudent(student) {
    return new Promise(
        (resolve, reject) => {
            console.dir(student);
            bucket.insert(uuid.v4(), student, (err, res) => {
                console.log(err);
                console.log(res);
            });
            resolve();
        }
    )
}

// query all students

// query one student

// update one student's name

// delete one student


// process.exit(0);

