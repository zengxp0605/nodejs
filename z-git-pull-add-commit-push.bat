::@echo off  
::echo show %1%  

git pull 

git add * -A

set /p ver=commit massage：  

::echo 版本：%ver% 打包开始  

git commit -m "%ver%"

git push

pause