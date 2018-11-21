# cookiecruncher

Script for processing cookies exported with Cookie Manager addon for Firefox
https://github.com/ysard/cookie-quick-manager

How to use:
- export the cookies using the addon in a json format
- place the json file into the "process" subfolder of the project
- run "node ." in the terminal
Result:
In the "output" directory you will have an CSV file with the list of cookies (with byte size included)
and a second file containing only the cookie values without any additional text ment only for size check
