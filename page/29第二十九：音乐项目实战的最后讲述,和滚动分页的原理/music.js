var bMusic = (function () { 
    var _music = {
        //音乐
        songs: [],
        len: 0,
        //播放的索引
        playIndex: 0,
        //audio对象播放器元素
        audioDom: document.createElement("audio"),
        //添加歌曲到播放器中
        add:function(songsArr){
            console.log(songsArr);
            this.songs = songsArr;
            this.len = this.songs.length;
            //默认播放歌曲   第一首
            this.audioDom.src = this.songs[this.playIndex].src;
            this.audioDom.controls = "controls"
            document.getElementById("audioBox").appendChild(this.audioDom);
        },
        //播放
        play:function(){
            this.audioDom.play();
        },
        //暂停
        stop: function(){
            this.audioDom.pause();
        },
        //上一首
        prev: function (callback) { 
            this.playIndex = (this.playIndex == 0)? this.len-1 : --this.playIndex;
            this.playMain();
            if(callback) callback.call(this.playIndex)
        },
        //下一首
        next: function (callback) { 
            this.playIndex = (this.playIndex == this.len-1)? 0: ++this.playIndex;
            this.playMain();
            if(callback) callback.call(this.playIndex)
        },
        //控制总开关
        playMain: function () { 
            this.audioDom.src = this.songs[this.playIndex].src;
            if(this.audioDom.paused){
                this.play()
            }
        },
        //外部传值进来播放音乐
        plauindex: function (index) {  
            this.audioDom.src = this.songs[index].src;
            this.playIndex = index;
            //audioDom.paused检查是否暂停
            if(this.audioDom.paused){
                this.play()
            }
        },
        //时间控制
        event: function (callback) { 
            var json ={};
            var $this = this;
            //oncanplaythrough 事件在视频/音频（audio/video）可以正常播放且无需停顿和缓冲时触发。
            this.audioDom.oncanplaythrough = function(){
                json.total = $this.format(this.duration);
                if(callback) callback.call(json,"date")
            };
            this.audioDom.ontimeupdate = function () { 
                //剩余
                json.fplay = $this.format(this.currentTime);
                //播放的时间
                json.fback = $this.format(this.duration-this.currentTime);
                //时间百分比
                json.prencent = ((this.currentTime/ this.duration)*100).toFixed(0);
                if(callback) callback.call(json,"play")
             }
        },
        format: function (time) { 
            var m = Math.floor(time/60);
            var s = Math.floor(time%60);
            if(m<10) m= "0"+m;
            if(s<10) s= "0"+s;
            return m+ ":" +s
        }
    };
    return _music;
 })();