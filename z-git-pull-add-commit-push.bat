::@echo off  ::ע�ͷ���,  echo off ��ʾ���������
::echo show %1%  

git pull 

git add * -A

set /p ver=commit massage��  

git commit -m "%ver%"

git push

pause