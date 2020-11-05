声明在vue-data区域的object数据再script中改变时界面没有改变

发现直接操作vue-object对象是有问题的

解决办法:

在局部重新声明一个new_<原对象名>的对象, 对new对象进行修改

使用new对象赋值覆盖原来的对象即可