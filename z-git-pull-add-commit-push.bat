::@echo off  
::echo show %1%  

git pull 

git add * -A

set /p ver=commit massage��  

::echo �汾��%ver% �����ʼ  

git commit -m "%ver%"

git push

pause