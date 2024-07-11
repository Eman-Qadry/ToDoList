const task=require('../models/task');
exports.getTasks=(req,res,next)=>{
    userId=req.body.userId;
    task.find({userId: userId}).then(tasks=>{
        if (!tasks){
            const error = new Error('could not find task!');
            error.statusCode=404;
            throw error;
           
        }
        res.status(200).json({
            message:"success",
            data:{
                tasks
            }
        })
    }).catch(err=>{
        return res.status(404).json({ message: err.message });
    })
}

expoerts.getTask=(req,res,next)=>{
    const id=req.params.id;
    task.findById(id).then(task=>{
   if (!task){
   return res.status(400).json({
        message:"failed to get task"
    })}
    res.status(200).json({
        message:"success",
        data:{
            task
        }
    });
   
    }).catch(err=>{
        return res.status(404).json({ message: err.message });
    })
}
expoerts.createTask=(req,res,next)=>{
    const newTask= new task({
     title:req.body.title,
     description:req.body.description,
     userId:req.body.userId,
     priority :req.body.priority,
     startDate:req.body.startDate,
     endDate:req.body.endDate,
     completed:req.body.completed
 } );
 newTask.save().then(res=>{
  res.status(201).json({
    message:"task added successfully",
    data:{
        newTask  
    }
  })
 })
 .catch(err=>{
    return res.status(400).json({
        message:err.message
    })
 })
}

exports.deleteTask=(req,res,next)=>{
    task.findByIdAndDelete(req.params.id).then(res=>{
  res.status(200).json({
    message:"task deleted successfully"
  })
    })
    .catch(err=>{
        return res.status(500).json({
            message:err.message
        })
     })
}
exports.EditTask=(req,res,next)=>{
    task.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },req.body).then(updated=>{
            res.status(200).json({ message:"Task updated successfully",
                data:{
                    task:updated
                }
            });
        }).catch(err=>{
            res.status(400).json({
                message:err.message
            })
        })
}