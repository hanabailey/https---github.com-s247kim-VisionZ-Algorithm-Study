import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

function App() {

  //task (to do list )state
  const [toDo, setTodo] = useState([
    // {id : 1, title: "Task1", status: false},// true면 이미 작업 끝, false면 아직 해야됨
    // {id : 2, title: "Task2", status: false}
  ])

  //Temporary State
  const [newTask, setNewTask] = useState(''); // 새로운 할일의 상태 설정
  const [updateData, setUpdateData] = useState(''); // 편집중인 작업을 보관

  //add Task
  const addTask =()=>{
    if(newTask){
      let num = toDo.length +1; //할일 앞에 숫자 넣어주기
      let newEntry = { id : num , title : newTask, status: false}
      setTodo([...toDo, newEntry])
      setNewTask(''); // temporary state를 비워준다. 
    }
  }

  //delete Task
  const deleteTask =(id)=>{
      let newTaks = toDo.filter( task => task.id !== id )
      setTodo(newTask)
  }

  //mark task as done or completed
  const markDone = (id)=>{
      let newTask = toDo.map(task =>{
        if( task.id ===id){
          return({...task, status: !task.status})
        }
        return task;
      })
      setTodo(newTask)
  }


  //cancle update
  const cancleUpdate = (id)=>{
    setUpdateData('');

  }
  
  //change task for update
  const changeTask =(e)=>{
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      status: updateData.status? true : false
    }
    setUpdateData(newEntry);
  }

  //update Task 
  const updateTask =(e)=>{
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id)
    let updateObject = [...filterRecords, updateData]
    setTodo(updateObject);
    setUpdateData('');
  }

  return (
    <div className="container App">
      <br></br>
      <h2> To Do List</h2>
      <br></br>


      {/*update task*/}
        {updateData && updateData ? (
            <>
              <div className='row'>
            <div className='col'>
              <input 
                value={ updateData && updateData.title}
                onChange = {(e)=> changeTask()}
                className="form-control form-control-lg">
              </input>   
            </div>
            

            <div className='col-auto'>
              <button 
                onClick={updateTask}
                className='btn btn-lg btn-success mr-20'>Update</button>
              <button 
                onClick={cancleUpdate}
                className='btn btn-lg btn-warning'>Cancel</button>
            </div>

          </div>
          <br></br>
            </>
        ) 
        
        
        :(
          <>
              {/*add task*/}
              <div className='row'>
                <div className='col'>
                  <input 
                    value={newTask}
                    onChange={ (e)=>setNewTask(e.target.value)}
                    className='form-control form-control-lg'>
                  </input>

                </div>
                <div className='col-auto'>
                  <button 
                    onClick={addTask}
                    className='btn btn-lg btn-success'>Add Task</button>

                </div>
              </div>
            <br></br>
          </>
        )}

        
    
      {/* display Todos */}

      {toDo && toDo.length ? '':'No Tasks...'}

      {toDo && toDo
        //
        .sort((a,b)=> a.id>b.id ? 1 : -1)
          //index는 작업에 대한 번호를 매기기 위해서 가져옴 
        .map((task,index)=>{
          return(
            <React.Fragment key={task.id}>

              <div className="col taskBg">
                <div className={task.status? 'done':''}>
                  <span className='taskNumber'>{index + 1}</span>
                  <span className='taskText'>{task.title}</span>
                </div>

                <div className='iconWrap'>
                  <span title="Completed / Not Completed"
                        onClick={(e)=>markDone(task.id)}>
                    <FontAwesomeIcon icon ={faCircleCheck} />
                  </span>


                  {task.status ? null : (<span 
                    title="Edit" onClick={()=>setUpdateData({id : task.id, title : task.title, status : task.status? true : false })}>
                    <FontAwesomeIcon icon ={faPen} />
                  </span>)}
                  
                  <span title="Delete"
                        onClick={()=>deleteTask(task.id)}>
                    <FontAwesomeIcon icon ={faTrashCan} />
                  </span>
                </div>
              </div>

      
            </React.Fragment>
          )
        })
      }

      
    </div>
  );
}

export default App;
