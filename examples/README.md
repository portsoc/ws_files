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

# make a copy of a text file
* copyfile.js
* modules/sync1.js
* modules/sync2.js
* modules/stream1.js

Copies a text file using names specified using command line arguments

Three versions:
* `sync1.js` is entirely synchronous (blocking) with no error checking.
* `sync2.js` is entirely synchronous (blocking) but checks that the file to be copied exists, and that the file to be created does not already exist,
* `stream1.js` is stream based, so has lower memory overheads and is (to many eyes) a cleaner solution.

# shebang
* copy.js

Extends copyfile so that it can be run as a 'native' utility script

# File processing
* countunique.js
* modules/counter.js
* count_these.txt
Count the unique words in a specifid file.

# Others

* createdb.sql
* names.js
* sql_config.js
* sql_count.js
* sql_insert.js
* sql_insert2.js
* sql_list.js
* sql_list2.js
