# HTMLChatbot
*This is the HTML Chatbot, you can have multiple people take attendence on this chatbot!*
![Alt-text](https://github.com/Geraldcdx/HTMLChatbot/blob/master/Chatbot.png)

#### Description: There are admin(ones that can edit the row,column, summation headers and groups) and there are users that input attendance.

## Users:
  * Users just need to know their user password and group that they are taking attendance for. The users will be getting a list of groups from the admin
  * Users just need to follow the prompting and instructions

### Admin commands on the chatbot:
<br>4 Groups that you need to understand:<br>Headers - The top columns<br>
Rows - The values for the left column<br>SubGroups- To divide the total attendance, if there is no association just put nil<br>
Summation Headers - You can customise the sum of headers you want from the given input headers.
Commands:<br>#addHeader (insert header) - to input a new header <br>#delHeader (insert header) - to delete a header<br>
#headers - to view all the headers that you have set<br>#addRow (insert row) - inserts row <br>#delRow (insert row) - deletes row<br>
#rows - views all the rows you've set<br>#table - views everything in a table-like format<br>
#addSum (insert summation header here) - adds summation header<br>#delSum - deletes the previous summation header inputted<br>
#sum - views all the summation headers<br>#addSub (insert subgroup) - adds a subgroup<br>#delSub - deletes the previous subgroup inputted<br>
#sub - show you all the subgroups created<br>#confirm - sets all the headers and rows to be used for users<br>
#clearSubs/clearSums/clearRows/clearHeaders - use to clear any of the items, use when there is a error/bug<br>
#Attendance - Sends you a message on all the inputted attendance<br><br>
