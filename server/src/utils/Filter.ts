export default class Filter {
    excludeSpecial(s:any){
        for (let a in s ){
            // 去掉转义字符
            s[a] = s[a].replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
            // 去掉特殊字符
            s[a] = s[a].replace(/[\@\#\$\%\^\&\*\(\)\{\}\:\"\L\<\>\?\[\]]/g,'');
        }
        return s;
    }
}