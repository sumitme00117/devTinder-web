import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests } from '../utils/requestSlice';

const Requests = () => {

    const requests = useSelector((store) => store.requests);

    const dispatch = useDispatch();

    const fetchRequests = async () => {
        try{
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {
                withCredentials: true,
            });
            dispatch(addRequests(res?.data?.data));
        }
        catch(error){
            console.error("Error fetching requests:", error);
        }
    }

    const reviewRequest = async (status, requestId) => {
        try{
            const res = await axios.post(`${BASE_URL}/request/review/${status}/${requestId}`, {}, {
                withCredentials: true,
            });
            fetchRequests();
        }
        catch(error){
            console.error("Error reviewing request:", error);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, [])

  if (!requests) return;

  if (requests?.length === 0)
    return <h1 className="text-center text-2xl">No requests yet</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>

      {requests.map((request, index) => {
        const {_id, firstName, lastName, photoUrl, gender, age, about } =
          request.fromUserId;
        return (
          <div className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 w-2/3 mx-auto" key={_id}>
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4">
              <h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
              {age && gender && <p>{age + "," + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button className="btn btn-primary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
              <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Requests
