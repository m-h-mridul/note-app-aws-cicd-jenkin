import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Update = () => {
  const note = useLoaderData();
  const { _id, noteText } = note;

  const updateNote = (event) => {
    event.preventDefault();

    const form = event.target;

    const noteText = form.note.value;

    const updateNote = { noteText };
    console.log(updateNote);

    //SEND DATA TO SERVER
    fetch(`http://localhost:3000/note/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateNote),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          Swal.fire({
            title: "Success!",
            text: "Note Updated Successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={updateNote}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl ">Update Your Note Here</span>
            </label>
            <textarea
              type="text"
              name="note"
              defaultValue={noteText}
              placeholder="text"
              className="textarea textarea-bordered textarea-lg w-full "
            ></textarea>

            <input
              type="submit"
              className="btn mt-6"
              value="UPDATE YOUR NOTE"
            />
          </div>


        </form>

        <Link to='/' >
          <h3> BACK TO HOME </h3>
          </Link>
      </div>
    </div>
  );
};

export default Update;
