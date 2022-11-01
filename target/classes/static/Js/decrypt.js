
function gcd(a, b) {
    if (a < b) {
      return gcd(b, a);
    } else {
      if (a % b === 0) {
        return b;
      } else {
        return gcd(b, a % b);
      }
    }
  }
  
  function gen_key(q) {
  //   var key;
    var keyy  = Math.floor(Math.random() * (q - 1)) + Math.pow(10, 2)
  //   key = random.randint(pow(10, 10), q);
  
    while (gcd(q, keyy) !== 1) {
      keyy  = Math.floor(Math.random() * (q - 1)) + Math.pow(10, 2)
      // key = random.randint(pow(10, 10), q);
    }
  
    return keyy;
  }
  
  function power(a, b, c) {
    var x, y;
    x = 1;
    y = a;
  
    while (b > 0) {
      if (b % 2 !== 0) {
        x = (x * y) % c;
      }
  
      y = (y * y) % c;
      b = Number.parseInt(b / 2);
    }
  
    return x % c;
  }
  
  function encrypt(msg, q, h, g) {
    var en_msg, k, p, s;
    
    en_msg = [];
  //   console.log("Pesan = " + msg);
    k = gen_key(q);
  //   console.log("hasil k = " + k);
    s = power(h, k, q);
  //   console.log("hasil s = " + s);
    p = power(g, k, q);
  //   console.log("hasil p = " + p);
  
    for (let i = 0; i < msg.length; i++) {
      en_msg.push(msg[i])
    }
  
    console.log("g^k used : ", p);
    console.log("g^ak used : ", s);
    for (let i = 0; i < msg.length; i++) {
      console.log("S = " + s);
       en_msg[i] = s * en_msg[i].charCodeAt(0);
      //  console.log("Hasil perubahan" + en_msg.charCodeAt(i));
    
    }
  
    return [en_msg, p];
  }
  
  function decrypt(en_msg, p, key, q) {
    var dr_msg, h;
    dr_msg = [];
    h = power(p, key, q);
    for (let i = 0; i < en_msg.length; i++) {
      dr_msg.push(String.fromCharCode(Number.parseInt(en_msg[i] / h)))
     
    }
  
    return dr_msg;
  }
  
  function main() {
    var dmsg, dr_msg, en_msg, g, h, key, msg, p, q;
    msg = "apa";
    console.log("Original Message :", msg);
  //   q = random.randint(pow(10, 20), pow(10, 50));
    q = Math.floor(Math.random() * (Math.pow(10, 4) - 1)) + Math.pow(10, 1)
    g = Math.floor(Math.random() * (q - 1))  + 2
  //   g = random.randint(2, q);
    key = gen_key(q);
    h = power(g, key, q);
    console.log("g used : ", g);
    console.log("g^a used : ", h);
    [en_msg, p] = encrypt(msg, q, h, g);
      var result_engkrip = en_msg
      console.log("Nilai p " + typeof(p));
      console.log("Nilai eng_msg " + typeof(en_msg));
    dr_msg = decrypt(result_engkrip, p, key, q);
   console.log("type data = " + typeof(result_engkrip));
  //   dmsg = "".join(dr_msg);
    dmsg = dr_msg.join("");
    console.log("hasil engkrip = " + en_msg);
    console.log("Decrypted Message :" + dmsg);
  }
  
  main()

const textHidden = document.getElementById("textHidden")
const file = document.getElementById("files")
const btnDecrypt = document.getElementById("decrypt")
const a = document.getElementById("download")
const privateKey1 = document.getElementById("priKey1")
const privateKey2 = document.getElementById("priKey2")
const nilai_Q = document.getElementById("nilaiQ")





let temp = new Array();
let fileName, convertToNumber
var dmsg, dr_msg
    btnDecrypt.onclick = function () {
        
        if(file.files.length == 0 ){
        alert("Silahkan masukkan FILE terlebih dahulu")
        } else {
            var start = new Date().getTime();

            dr_msg = decrypt(temp, parseInt(privateKey2.value),parseInt( privateKey1.value),parseInt(nilai_Q.value));
            dmsg = dr_msg.join("");
            textHidden.value = dmsg

            var end = new Date().getTime()
            var time = end - start
            console.log("Time = " + time);
            alert("Silahkan tekan Download untuk Mendownload")
            
        }
        
    }


   
    file.onchange = function(){
        let file = this.files[0]
        console.log(file);
        let reader = new FileReader()
        console.log(file.size);
    
        reader.onload = function () {
            
            var sizeInMB = (file.size / (1024*1024)).toFixed(2);
            console.log();
            if (sizeInMB > 2.00){
              alert("Ukuran file melebihi 2 MB" + "\nsilahkan masukkan ukuran file yang lebih kecil")
            }
            
            textHidden.value = this.result
            
    // This will return an array with strings "1", "2", etc.
            temp = this.result.split(",");

            for (let a in temp ) {
                temp[a] = parseInt(temp[a], 10); // Explicitly include base as per Álvaro's comment
            }
           
            
            
         
            fileName = file.name
            console.log("File name = " + fileName);
            

        }
        reader.readAsText(file)
    }

    a.onclick = function () {
        if(file.files.length == 0 ){
            alert("Silahkan masukkan FILE terlebih dahulu")
        } else {
            a.setAttribute('href', textHidden.value)
            a.setAttribute('download', fileName.replace('.encrypted',''))
        }
    }



a.onclick = function () {
    if(file.files.length == 0 ){
        alert("Silahkan masukkan FILE terlebih dahulu")
    } else {
        a.setAttribute('href', textHidden.value)
        a.setAttribute('download', fileName.replace('.encrpyted',''))
    }
}
