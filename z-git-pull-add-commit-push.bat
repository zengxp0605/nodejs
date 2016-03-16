::@echo off  ::注释符号,  echo off 表示不输出命令
::echo show %1%  

git pull origin master

git add * -A

set /p ver=commit massage：  

git commit -m "%ver%"

git push origin master

pause