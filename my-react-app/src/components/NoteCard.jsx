import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const NoteCard = ({ note, notes, setNotes }) => {
  const { _id, noteText } = note;

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/note/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your note has been deleted.", "success");
              const remaining = notes.filter((note) => note._id !== _id);
              setNotes(remaining)
            }
          });
      }
    });
  };
  return (
    <div>
      {/* <h2 className="text-lg">{noteText}</h2> */}

      <div className="card   bg-base-100 shadow-xl mt-4 ">
        <div className="card-body">
          {/* <h2 className="card-title">Card title!</h2> */}
          <div className="flex justify-between">
            <div>
              <p>{noteText}</p>
            </div>
            {/* <div className="card-actions justify-end  ">
            <button className="btn btn-primary">EDIT</button>
            <button className="btn btn-primary">DELETE</button>
          </div> */}
            <div className="btn-group btn-group-vertical space-y-3  ">
              <Link to={`update/${_id}`}>
                <button className="btn ">EDIT</button>
              </Link>
              <button onClick={() => handleDelete(_id)} className="btn  ">
                DELETE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
