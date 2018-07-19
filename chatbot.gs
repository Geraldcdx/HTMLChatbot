function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Attendance');
}

//var ss = SpreadsheetApp.openById("1KaGDF53FKH2Nqk4t2jj4w189LEH2dQ9Gp--zghP0z1s");
//var cache = CacheService.getUserCache();
function test(){
   var sp = PropertiesService.getScriptProperties();
  //sp.setProperty("Association","false");
//var str={};
//sp.setProperty("Dict", JSON.stringify(str));========================>DICTIONARIES HAVE TO BE PRESET
}
function receiveText(form){//code that text is received and saved
  var nameBox = form.text.trim();
  Logger.log(nameBox);
  var cache = CacheService.getUserCache();
  cache.put("text",nameBox);
}
function itemss() {//compare and put out the text>THIS IS TEST CODE
  var cache = CacheService.getUserCache();
  //cache.put("text","hello");
  var exmp =cache.get("text");
  var x=exmp;
  //x+=exmp;
  if(x=="hello")
  return( "Password correct" );
  else return x;
}

var ss="1GPD_yGexfr21vqR7ggRrkhlbmsrV3zidX6BzGYdHGOw";//Change this to your spreadsheetname

function sendText(id,str){
 return str+="\n"; 
}
function testcode(id,head)//------------------------------------------------------------->Function that helps with sending out the Attendance Message
{
  var sp = PropertiesService.getScriptProperties();
  var s= SpreadsheetApp.openById(ss);
  var cache = CacheService.getUserCache();
  var spr=s.getSheetByName("Sheet1");//CHANGE THIS TO GET A DIFFERENT SPREADSHEET name tab
  var D=(JSON.parse(sp.getProperty("Dict")));//Dictionary that stores key value pairs. Group->SubGroup..e.g. AC A ---->ACIB
  var SG=JSON.parse(sp.getProperty("SubGroups"));//Subgroups------------>SubGroups such as ACIB,NORTH,SOUTH,EAST,WEST
  var FH=JSON.parse(sp.getProperty("finalHeaders"));//finalHeaders
  var FHNo=FH.length;//number of finalHeaders--------------->After confirmValues is used
  var SH=JSON.parse(sp.getProperty("SumHeaders"));//------------->Summation Headers
  var SHNo=SH.length;//--------------------------------//Number of Summation Headers-->Columns
  var Groups=JSON.parse(sp.getProperty("finalGroup"));//--------------->Final groups or rows
  //s.getSheetByName("Attendance").getRange(row, column).getValue();
  
  FHNo++;//generates the last row of input straight away
  var aStr="";
  var total2=[];//-------------------------->used to store the summation of everything without subgroups
  for(i=0;i<100;i++)total2.push(0);
  //Logger.log(D);
  //Logger.log(SG+Groups+FHNo+" "+SHNo);
  //Logger.log();
  for(a=0;a<SG.length;a++){//---------------------->For each Subgroup check all groups that fall into the subgroup
    var total=[];//------------------------------->This total is used to store the total number for each subgroup
    for(i=0;i<100;i++)total.push(0);//------------->Infinite Number of summation headers
    aStr+=("["+SG[a]+"]"+":"+"<br>");
    for(i=0;i<Groups.length;i++){//for every single group
      if(SG[a]==D[Groups[i]]){//add to the group/cg details to the string
        aStr+=(Groups[i]+ ": ");//push the name to string
      for(n=FHNo;n<FHNo+SHNo;n++){
        aStr+=(spr.getRange(i+1,n).getValue()+" ");//push all the other numbers
         if(n!=FHNo+SHNo-1)aStr+=" + ";
        total[n-1]+=spr.getRange(i+1,n).getValue();
        total2[n-1]+=spr.getRange(i+1,n).getValue();
      }
       //========count the total other variables======
        for(e=0;e<FHNo-1;e++){//------------------------------>sums up all the variables for used
          total[e]+=spr.getRange(i+1,e+1).getValue(); 
          total2[e]+=spr.getRange(i+1,e+1).getValue(); 
        } 
       //========================================
      //add the brackets here
        //-------------------
       aStr+="("; //------------------------------------------->Adds the summation of the top function above
        for(q=0;q<FHNo-1;q++){
          if(spr.getRange(i+1,q+1).getValue()==0)continue;
          aStr+=(spr.getRange(i+1,q+1).getValue()+FH[q]+ " ");
        }
       //----------------------
       aStr+=")"+"<br>";
    }
    }
    aStr+=(" Total: ");//-------------------------------For subgroup total
    for(n=FHNo-1;n<FHNo+SHNo-1;n++){
        if(total[n]!=0)aStr+=(total[n]);//------------------------>Prevent adding of 0s
      if(n!=FHNo+SHNo-2)aStr+=" + ";
      }
    aStr+="("; 
        for(q=0;q<FHNo-1;q++){
          if(total[q]==0)continue;
          aStr+=total[q]+FH[q]+" ";
        }
       //----------------------
       aStr+=")"+"<br>";
    aStr+="<br>";
  }
  if(SG.length!=1){

  aStr+=(head+" Total: ");//-------------------------------> JC total
    for(n=FHNo-1;n<FHNo+SHNo-1;n++){
        aStr+=(total2[n]);
      if(n!=FHNo+SHNo-2)aStr+=" + ";
      }
    aStr+="("; 
        for(q=0;q<FHNo-1;q++){
          aStr+=total2[q]+FH[q]+" ";
        }
  aStr+=")";
  }
  //Logger.log(aStr);
  return sendText(id,aStr);
}
//var googlesheetused="Attendance";
function items()//Main function to get information when receiving information
{
  var s= SpreadsheetApp.openById(ss);//This is helps interaction with the spreadsheet
  var spr=s.getSheetByName("Sheet1");//CHANGE THIS TO GET A DIFFERENT SPREADSHEET
  var sp = PropertiesService.getScriptProperties();//Stores globally in properties, unique to app
  var cache = CacheService.getUserCache();//Store unique to users
  var admin=cache.get('admin');//As a form of admin status
  var user=cache.get('user');//normal user status
  var start=cache.get('start');//when /start is pressed
  var values=cache.get('values');
  var headers=sp.getProperty('headers');
  var rows=sp.getProperty('rows');
  var Group=sp.getProperty('Group');
  var cols=sp.getProperty('cols');
  var str5=["x"];str5.pop();//string used as a string list
  //main place to run code and if error will be thrown in the catch block

  try{
  //------Basic syntax needed to obtain a text from user,add more parsing information if you need-----------
//  var contents= JSON.parse(e.postData.contents);
//  var text=contents.message.text;//use the.<something> to get the value
//  var id=contents.message.from.id;
//  var name=contents.message.from.first_name +" "+contents.message.from.last_name;
  //--------------------Parsing of relevant information ends here------------------
  //sendText(id,start);
  //-----------------------start the main code here--------------------------------
  var text =(cache.get("text")); 
  var id= "empty string";
  if(text=="/start"){//---------------------------------------->Determines the commands to start a convo
    //return sendText(id,"Tell me the password!");
    cache.put("start","yes",300);//--------------------------------->5 minutes such thet the user will be logged on
    cache.put("admin","no");//--------------------------------------->ends all admin status
    cache.put("user","no");//---------------------------------------->ends all user status
    return sendText(id,"Tell me the password!");
//    sp.setProperty("SumHeaders", JSON.stringify([]));
//    sp.setProperty("SumHeads","0");
   
  }
//    else if(text=="No"){
//     var x=cache.get("test");
//     sendText(id,x);
//     cache.put("test",name);   
//    }//cacheuser does not get unique information
  else if (start=="yes"){
      if(text=="admin"){//If admin password is given
        cache.put('admin', "yes",3600);//gives admin status for an hour
        cache.put("start","no");
        return sendText(id,"You are now logged in as Admin! Type /adminhelp for commands");
      }
      else if(text=="user"){//if user password is given
        cache.put('user', "yes",300);
        cache.put("Loop", "False");
        cache.put("start","no",300);
        return sendText(id,"Ready to input your attendance?<br> What is the name of your group?");
        
      }
      else{ 
        return sendText(id,"You have typed an incorrect password,please try again!");        
    }
  }
  else if (admin=="yes")//------------------------------------------------------------------------>all the admin privileges here
  {         
    if(text=="/adminhelp")
    {
      var str=""
      str+="Here are a list of Admin information:<br>4 Groups that you need to understand:<br>Headers - The top columns<br>";
      str+="Rows - The values for the left column<br>SubGroups- To divide the total attendance, if there is no association just put nil<br>";
      str+="Summation Headers - You can customise the sum of headers you want from the given input headers.<br><br>";
      str+="Commands:<br>#addHeader (insert header) - to input a new header <br>#delHeader (insert header) - to delete a header<br>";
      str+="#headers - to view all the headers that you have set<br>#addRow (insert row) - inserts row <br>#delRow (insert row) - deletes row<br>";
      str+="#rows - views all the rows you've set<br>#table - views everything in a table-like format<br>";
      str+="#addSum (insert summation header here) - adds summation header<br>#delSum - deletes the previous summation header inputted<br>";
      str+="#sum - views all the summation headers<br>#addSub (insert subgroup) - adds a subgroup<br>#delSub - deletes the previous subgroup inputted<br>";
      str+="#sub - show you all the subgroups created<br>#confirm - sets all the headers and rows to be used for users<br>";
      str+="#clearSubs/clearSums/clearRows/clearHeaders - use to clear any of the items, use when there is a error/bug<br>";
      str+="#Attendance - Sends you a message on all the inputted attendance<br><br>Created by Gerald Chua Deng Xiang 2018";
      return sendText(id,str);
    }
    else if(sp.getProperty("Association")=="True"){//sets associations towards subgroups    
      var l= JSON.parse(sp.getProperty("Dict"));
      l[sp.getProperty("PreviousText")]=text;
      sp.setProperty("Dict", JSON.stringify(l));
       sp.setProperty("Association", "False");
      return sendText(id,sp.getProperty("PreviousText")+" is associated with "+text+"\n You may carry on.");
     
    }
    else if(/^#/.test(text))
    {
      var cmd=text.slice(1).split(" ")[0];
      var heading=text.split(" ").slice(1).join(" ");//adding the text after the @var
      if(cmd=="addHeader" && heading!=null)//-------------------------------------------ADD HEADERS FUNCTION
      {      
        return add(heading,"cols","headers",sp,id);
    }
      else if(cmd=="headers"){//---------------------------SEE THE HEADERS FUNCTION
        return check("headers","cols",sp,id,1);
      }
      else if(cmd=="delHeader" && heading!=""){//---------------------------------------------->DELETED HEADER FUNCTION
        return del(heading,"headers","cols",sp,id);     
      }
      else if(cmd=="addRow" && heading!="")//-------------------------------------------ADD HEADERS FUNCTION
      {      
        //return heading;
        return add(heading,"rows","Group",sp,id);
    }
      else if(cmd=="rows"){//---------------------------SEE ALL ROWS
        return check("Group","rows",sp,id,1);
      }
      else if(cmd=="delRow" && heading!=""){//---------------------------------------------->DELETE ROW
        return del(heading,"Group","rows",sp,id);     
      }
      else if(cmd=="table"&&heading==""){//------------------------------------------------->SHOWS THE TABLE
        var line="";
        line+=check("headers","cols",sp,id,1)+"<br>";
        line+=check("Group","rows",sp,id,2);
        return line;
      }
      else if(cmd=="confirm"&&heading==""){//------------------------------------>CONFIRM FINAL IDEAS
        var line="";
        line+=set("headers","finalHeaders",id)+"<br>";
        line+=set("Group","finalGroup",id)+"<br>"; 
        line+=summed(sp,id)+"<br>";
        line+=sub(sp,id);
        return line;
      }
      else if(cmd=="addSum"){//------------------------------->ADD SUMMATION HEADER
         var heads=heading.split(" ");
        //code that checks with the current headers to create a summation header-->final headers check
        var line="";
        line+=set("headers","finalHeaders",id)+"<br>";     
        line+=checksHeaders(heads,sp,id);
        return line;
      }
      else if(cmd=="sum"){//------------------------------------------>CHECKS SUMMATION HEADERS
        return summed(sp,id);
      }
      else if(cmd=="delSum"){//--------------------------------------------->DELETE SUMMATION HEADER
        var sums=JSON.parse(sp.getProperty("SumHeaders"));
        sums.pop()
        sp.setProperty("SumHeaders",JSON.stringify(sums));
        sp.setProperty("SumHeads",parseInt(sp.getProperty("SumHeads"))-1);
        return sendText(id,"The last added summation header has been removed");
      }
      else if(cmd=="addSub"){//-------------------------------------------->ADD GROUP
        var l=JSON.parse(sp.getProperty("SubGroups"));
        l.push(heading);
        sp.setProperty("SubGroups", JSON.stringify(l));
        return sendText(id,heading+" has been added to SubGroups!");
      }
      else if(cmd=="sub"){//-------------------------------------------->SEES SUBGROUPS
        return sub(sp,id);
      }
      else if(cmd=="delSub"){//-------------------------------------------->DELETE PREVIOUS SUBGROUP
        var sum=JSON.parse(sp.getProperty("SubGroups"));
        sum.pop();
        sp.setProperty("SubGroups",JSON.stringify(sum))
        return sendText(id,"The last added group has been removed"); 
      }
      else if(cmd=="Attendance"){//--------------------------------------->GENERATES ATTENDENCE
       return testcode(id,heading);
      }
      else if(cmd=="clearSubs") {
        var str={};
        sp.setProperty("Dict", JSON.stringify(str));//========================>DICTIONARIES HAVE TO BE PRESET
        var str=[];
        sp.setProperty("SubGroups", JSON.stringify(str));
        return sendText(id,"Subgroups have been cleared");
      }
      else if(cmd=="clearSums"){
        var str=[];
        sp.setProperty("SumHeaders", JSON.stringify(str));
        return sendText(id,"Summation Headers have been cleared");
      }
      else if(cmd=="clearRows"){
        var str={};
        sp.setProperty("Group", JSON.stringify(str));
        return sendText(id,"Rows have been cleared");
      }
      else if(cmd=="clearHeaders"){
        var str={};
        //str["null"]="null";
        sp.setProperty("headers", JSON.stringify(str));
        return sendText(id,"Headers have been cleared");
      }
      else return sendText(id,"Invalid command type /adminhelp for more help!");
  }//end of the #commandblocks
  }//end of admin
    
  else if(user=="yes")//all the user privileges here======================================>USER ==============>USER
  {
    if(cache.get("Loop")=="False"){
      var Allgroups=JSON.parse(sp.getProperty("finalGroup"));
      var test="false";
      for(i=0;i<Allgroups.length;i++){
        if(Allgroups[i]==text){ 
          test="true";
          cache.put('currentUser', text);
          break;
        }       
      }
      if(test=="true"){
      cache.put("Loop", "True");
      var stri="";
      stri+="Welcome attendance taker of "+text+"!"+"<br>";//=======SEND TEXT
      var l=JSON.parse(sp.getProperty("finalHeaders"));
      stri+="How many "+l[0]+ " were present?"+"<br>";//=========SEND TEXT
      sp.setProperty("NumOfHeaders", l.length);
      cache.put("count","1");
      cache.put("Loop","True");
      var str=[]
      cache.put("Values",JSON.stringify(str));
      stri+=JSON.parse(cache.get("Values"));
      if(l.length==1)cache.put("Loop","Complete");
      return sendText(id,stri);
      //return sendText(id,JSON.parse(cache.get("Values")));
      }
        else return sendText(id,"Invalid group try again");
        }
    //declare the number of times to loop
    else if(cache.get("Loop")=="True"){
      var str=JSON.parse(cache.get('Values'));//Append to the cache
      str.push(text);
      cache.put("Values",JSON.stringify(str));
      var l=JSON.parse(sp.getProperty("finalHeaders"));
      var num=parseInt(cache.get("count"));
      
      cache.put("count",num+1);//increments
      if(parseInt(cache.get("count"))==parseInt(sp.getProperty("NumOfHeaders"))) cache.put("Loop","Complete");
      return sendText(id,"How many "+l[num] +" were present?")
    }
    
    else if(cache.get("Loop")=="Complete"){     
      var str=JSON.parse(cache.get('Values'));//Append to the cache
      str.push(text);
      var USER=cache.get('currentUser');
    var AllHeaders=JSON.parse(sp.getProperty("finalHeaders"));
    var stringy="";stringy+=USER+" has ";
      for(i=0;i<AllHeaders.length;i++){//sendText(id,USER+" has "+str[i]+" "+AllHeaders[i]);//-------------->confirmed message to user
        stringy+=str[i]+" "+AllHeaders[i];
        if(i!=AllHeaders.length-1)stringy+=",";
      }
      //sendText(id,stringy);
      var aStr="";
      aStr+=stringy+"<br>"+"Total: ";
      
      cache.put("Loop", "False");
    //----------------------------------------------------------->so All groups has all the header values and str has all the data for the values
    var AllGroups=JSON.parse(sp.getProperty("finalGroup"));
    var pos;
    for(z=0;z<AllGroups.length;z++)
      if(USER==AllGroups[z]){
       pos=z+1;
       break;
      }
      var q;
      for(q=0;q<str.length;q++)spr.getRange(pos, q+1).setValue(str[q]);//----------------------->sets the value for the headers
      q++;
      var SH=JSON.parse(sp.getProperty('SumHeaders'));//-------------------------------------------->Sets the values for the addition headers
      var NoSH=SH.length;
        for(c=0;c<NoSH;c++){//get the summation header
          var strlist=SH[c];
          //sendText(id,strlist+" "+strlist.length);
          if(strlist.length==1){//search only one val
            //sendText(id,"Goes into the if block");
            for(b=0;b<AllHeaders.length;b++){
              if(AllHeaders[b]==strlist[0]){
               spr.getRange(pos,q).setValue(str[b]);q++
                break;
              }
            }
          }
          else{
            //sendText(id,"Goes into the else block");
            var total=0;
            for(b=0;b<strlist.length;b++){
              for(n=0;n<AllHeaders.length;n++){
                if(AllHeaders[n]==strlist[b]){
                 total+=parseInt(str[n]); 
                  break;
                }
              }
            }
            spr.getRange(pos,q).setValue(total);q++
          }
        }
      
       var FH=JSON.parse(sp.getProperty("finalHeaders"));//finalHeaders
      var FHNo=FH.length;//number of finalHeaders--------------->After confirmValues is used
      var SH=JSON.parse(sp.getProperty("SumHeaders"));//------------->Summation Headers
      var SHNo=SH.length;//--------------------------------//Number of Summation Headers-->Columns
      var Groups=JSON.parse(sp.getProperty("finalGroup"));//--------------->Final groups or rows
      FHNo+=1;
      for(p=0;p<Groups.length;p++){
        if(Groups[p]==USER){
  for(n=FHNo;n<FHNo+SHNo;n++){
        aStr+=(spr.getRange(p+1,n).getValue()+" ");
    if(n!=FHNo+SHNo-1)aStr+=" +";
  }
          break;
        }
      }
      aStr+="<br>"+"Thank you for your time :)";
    return sendText(id,aStr);
    }    
  }
else return "Wrong Command";   

  }catch(e){
    var x;
  }
  
}



//----------------------------------------------------FUNCTIONS RIGHT HERE-----------------------------------------------
function summed(sp,id){
 var sums=JSON.parse(sp.getProperty("SumHeaders"));
        var str1="";
        for(i=0;i<sums.length;i++){
            str1+="\n ["+sums[i]+"]";
          if(i!=sums.length-1)str1+=",";
            }
        return sendText(id,"The summation headers are: "+str1); 
}

function sub(sp,id){
   var l=JSON.parse(sp.getProperty("SubGroups"));
       var str1="";
       for(i=0;i<l.length;i++){
            str1+="\n ["+l[i]+"]";
         if(i!=l.length-1)str1+=",";
            }
        return sendText(id,"The SubGroups are: "+str1); 
}

function checksHeaders(heads,sp,id){
  var l=JSON.parse(sp.getProperty("finalHeaders"));
  passed=0;
  for(i=0;i<heads.length;i++){
    for(j=0;j<l.length;j++){
      if(heads[i]==l[j])passed++;
    }
  }
  if(passed!=heads.length) return sendText(id,"You have typed an incorrect header, please try again");
  else{  
    //store in sumheader
   var str=JSON.parse(sp.getProperty("SumHeaders"));
   str.push(heads);
   sp.setProperty("SumHeads", str.length);
   sp.setProperty("SumHeaders",JSON.stringify(str));
    return sendText(id,"The summation header of ["+heads+"] has been created and stored as summation header "+parseInt(sp.getProperty("SumHeads")));
  }
}

function set(headers,finalHeaders,id){
  var sp = PropertiesService.getScriptProperties();
  var s=[];
  var str="";
  var l=JSON.parse(sp.getProperty(headers));
  for (var key in l) {   
    if (l.hasOwnProperty(key)&&l[key]!="deleted") {           
      s.push(key);      
      str+=" | "+key;
      
    }
  }
  if(headers=="Group")headers="rows";
  sp.setProperty(finalHeaders,JSON.stringify(s));
  return sendText(id,"The "+headers+" have been set:"+ str);
  //  var finalHeaders=JSON.parse(sp.getProperty("finalHeaders"));
  //  Logger.log(finalHeaders); 
}
function del(heading,headers,cols,sp,id){//(rowTitles/headerinfo),(rows,cols)
        var l=JSON.parse(sp.getProperty(headers));
        if(l.hasOwnProperty(heading)){
          l[heading]="deleted";
          sp.setProperty(headers,JSON.stringify(l));
          var obj=sp.getProperty(headers);
          l=JSON.parse(obj);
          num=parseInt(sp.getProperty(cols));
          sp.setProperty(cols,num-1);
          if(headers="headers")headers="rows";
          return sendText(id,heading+" has been removed from your "+ headers );
          //sendText(id,l[heading]+" "+heading+" "+num +" "+sp.getProperty("rows"));
        }
        else return sendText(id,"The item " +heading+" does not exist"); 
}

function check(headers,cols,sp,id,num){// (rowTitles/headerinfo),(rows,cols)
        var s=[];
        var str="";
        var l=JSON.parse(sp.getProperty(headers));
        for (var key in l) {   
    if (l.hasOwnProperty(key)&&l[key]!="deleted") {           
        //key+l[key]
      if(num==1)
      str+=" | "+key;
      else str+=key+"\n";
    }
        }
  if(headers=="Group")headers="Rows";
        return sendText(id,"You have set "+headers+":\n"+str);
}


function add(heading,cols,headers,sp,id){//variable (heading/rowtitle/information),(cols/rows-for global property),(headers/rowDescription-global prop)
//  var sp = PropertiesService.getScriptProperties(); //add(heading,"cols","headers",sp,id);      
  var l=JSON.parse(sp.getProperty(headers));
        var num=parseInt(sp.getProperty(cols));//number of cols
        if(!l.hasOwnProperty(heading) || (l.hasOwnProperty(heading)&&l[heading]=="deleted")){       
          l[heading]=num+1;//------------->I realised a better method and it is to just intialise to anything and obtain the values through a loop
          sp.setProperty(cols,num+1)
          sp.setProperty(headers,JSON.stringify(l));
          var obj=sp.getProperty(headers);
          l=JSON.parse(obj);
          num=parseInt(sp.getProperty(cols));
          var str="";
          str+=heading+" has been added to your "+headers;//send text
          //sendText(id,l[heading]+" "+heading+" "+num +" "+sp.getProperty("rows"));
          if (cols=="rows"){//creates the association
            sp.setProperty("Association","True");           
            sp.setProperty("PreviousText", heading);
            str+="\nWhich subgroup does this item belong to?";
            return str;
          }
          return str;
        }
        
        else return sendText(id,"The item " +heading+" already exists");
}
