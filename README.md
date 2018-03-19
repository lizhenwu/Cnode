# Cnode
a simple Cnode community SPA developed with vue


## note

### 首页tab仿MD风格的点击波浪实现

面试的时候被问到了这个，结果没想起来，回答的是用animation和transform，scale，用js切换样式类...其实当时写的是纯css，还是摘出来记录一下吧,主要的css代码如下

```css
li{
    cursor: pointer;
    background: transparent;
    position: relative;
    overflow: hidden;
    &:after{
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
        background-image: radial-gradient(circle, #33A6B8 10%, transparent 10.01%);
        background-repeat: no-repeat;
        background-position: 50%;
        transform: scale(10, 10);
        opacity: 0;
        transition: transform .3s, opacity .5s;
    }
    &:active::after {
        transform: scale(0, 0);
        opacity: .3;
        transition: 0s;
    }
}
```
原理在于触发acitve的时候transition的时间是0s, 但透明度是0.3, scale是0, 而未触发的状态下是用scale放大, 透明度为0且transition的时间是.3s, 这样就能使在触发active之后回到初始状态的时候进行一次transition回到透明的初始状态, 完成一次波浪动画