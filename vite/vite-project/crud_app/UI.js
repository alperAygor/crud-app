
import { User } from "./user.js";
export class UI {
    static displayUser(userList) {
        
        const userTable = document.querySelector("#userTable");
        userTable.innerHTML = "";

        userList.forEach((user,index) => {
          userTable.innerHTML += `
            <tr>
              <th>${index+1}</th>
              <th>${user.name}</th>
              <th>${user.surname}</th>
              <th>${user.city}</th>
              <th>${user.age}</th>
              <th>
                <i class="fa-solid fa-pen-to-square btn btn-warning edit" data-id-edit="${index}"></i>
                <i class="fa-solid fa-trash btn btn-danger delete" data-id-delete="${index}"></i>
              </th>
            </tr>
          `;
            user.id==index+1;
          
        });
      }
     static showAlert(alertType,message){
        const alertDiv =`
        <div class=" alert alert-${alertType} w-75 mx-auto">${message}</div>
         `
    
        const title=document.querySelector(".title");
        title.insertAdjacentHTML("beforeend",alertDiv);
     
        setTimeout(() => {
            const alert=document.querySelector(".alert");
            alert.remove();
        }, 3000);
     }
     static deleteUser(target){
        const row = target.closest("tr");
        if (row) {
            row.remove();
            UI.showAlert("danger", "Başarılı bir şekilde silindi");
            const index =target.getAttribute("data-id-delete");
            User.userList.splice(index,1);
            UI.displayUser(User.userList);    
        }
        }
    
     static clearInput(){
        nameInput.value="";
        surnameInput.value="";
        cityInput.value="";
        ageInput.value="";
     }
    static editUser(target,userList){
        // const userTable = document.querySelector("#userTable");
        const index=target.getAttribute("data-id-edit")
        const user=userList[index];
        let tr=target.parentElement.parentElement;
        tr.innerHTML=``;
        for (const key in user) {
          const th=document.createElement("th");
          const input=document.createElement("input");
          if(key==="id"){
            const text=document.createTextNode(`${user[key]}`);
            th.appendChild(text);
            tr.appendChild(th);
            continue;
          }
          if(key==="age"){
            input.type="number";
          }
          input.value=user[key];
          input.classList.add("form-control");
          input.id=`${key}InputEdit${index}`;
          th.appendChild(input)
          tr.appendChild(th)  
        }
         const saveBtnTH=document.createElement("th");
        const i =document.createElement("i");
        i.classList="fa-regular fa-circle-check btn btn-primary save mt-1";
        i.setAttribute("data-id-save", index);
        saveBtnTH.appendChild(i);
        tr.appendChild(saveBtnTH);                                     
                                                 
           }
     static addUser(){
        const user=new User(nameInput.value,surnameInput.value,cityInput.value,ageInput.value);
     }
     static saveList(target){
        const index=target.getAttribute("data-id-save");
        const changedName=document.querySelector(`#nameInputEdit${index}`).value;
        const changedSurname=document.querySelector(`#surnameInputEdit${index}`).value;
        const changedCity= document.querySelector(`#cityInputEdit${index}`).value;  
        const changedAge =document.querySelector(`#ageInputEdit${index}`).value;
        if (changedName==""||changedSurname==""|| changedCity==""|| changedAge=="") {
          UI.showAlert("warning","Lütfen tüm alanları doğru şekilde doldurunuz");
        }
        else{
          User.userList[index].name=changedName;
          User.userList[index].surname=changedSurname;
          User.userList[index].city=changedCity;
          User.userList[index].age=changedAge;
          target.parentElement.parentElement.innerHTML=`
              <th>${parseInt(index)+1}</th>
              <th>${changedName}</th>
              <th>${changedSurname}</th>
              <th>${changedCity}</th>
              <th>${changedAge}</th>
              <th>
                <i class="fa-solid fa-pen-to-square btn btn-warning edit" data-id-edit="${index}"></i>
                <i class="fa-solid fa-trash btn btn-danger delete" data-id-delete="${index}"></i>
              </th>
          `
        }
      }
     
     
    }
