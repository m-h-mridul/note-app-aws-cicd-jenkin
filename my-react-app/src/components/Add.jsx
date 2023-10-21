import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const Add = () => {
  const addNote = (event) => {
    event.preventDefault();

    const form = event.target;

    const noteText = form.note.value;

    const newNote = { noteText };
    console.log(newNote);

    //SEND DATA TO SERVER
    fetch("http://localhost:3000/note", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if(data.insertedId){
            Swal.fire({
                title: 'Success!',
                text: 'Note Added Successfully',
                icon: 'success',
                confirmButtonText: 'Cool'
              })
              
        }
      });
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <div className="form-control">
          {/* <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          /> */}
          <label className="label">
            <span className="label-text text-xl ">Write Your Note Here</span>
          </label>
          <textarea
            type="text"
            name="note"
            placeholder="text"
            className="textarea textarea-bordered textarea-lg w-full "
          ></textarea>

          <input type="submit" className="btn mt-6" value="ADD YOUR NOTE" />
          <Link to='/' >
          <h3> BACK TO HOME </h3>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Add;
