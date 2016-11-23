# List of Examples

## load a file
* loadfile1.js

Load the `dummy1.txt` and print it's contents to the console.

## very basic command line arguments
* arguments.js

Lists any command line arguments passed to the program.

## load a user-defined file
* loadfile2.js

Load and print the contents of a file to the console.
File is user-defined as a command line parameter.

## create and write to a file
* createn.js
* modules/creater.js

Creates a new file whoe name is defined as a command-line parameter.
Two additional parameters define how many times a given word should be written to the new file.

## make a copy of a text file
* copyfile.js
* modules/sync1.js
* modules/sync2.js
* modules/stream1.js

Copies a text file using names specified using command line arguments

Three versions:
* `sync1.js` is entirely synchronous (blocking) with no error checking.
* `sync2.js` is entirely synchronous (blocking) but checks that the file to be copied exists, and that the file to be created does not already exist,
* `stream1.js` is stream based, so has lower memory overheads and is (to many eyes) a cleaner solution.

## Hashbang (aka shebang)
* copy.js
Extends copyfile so that it can be run as a 'native' utility script

Add this to the start of any node file:
`#!/usr/bin/env node`
...and it can be run by typing the filename rather than `node filename`.  On unix systems you can go further and symlink from `/usr/local/bin` to make the command available anywhere.  e.g.

`ln -s /usr/local/bin/copy copy.js`


## File processing
* countunique.js
* modules/counter.js
* count_these.txt
Count the unique words in a specifid file.


## MySQL

* createdb.sql
  Initializes the database
* sql_insert.js
  Inserts a random person
* names.js
  Gives us random names
* sql_config.json
  Contains database configuration
* sql_insert2.js
  Inserts two random persons in a transaction
* sql_count.js
  Counts the persons
* sql_list.js
  Lists all persons
* sql_list2.js
  Lists all persons with an optional filter
>>>>>>> ce804cee2ae314b4f2b34805069f5d0ea9040533
