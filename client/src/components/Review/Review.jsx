import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./Review.scss";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/image-removebg-preview.png";
import Rating from "../Rating/Rating";
import { FaStar } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";

const Review = ({ productId }) => {
  const { user } = useContext(Context);
  const [listReviews, setListReviews] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const navigate = useNavigate();
  const fetchReviews = async () => {
    axios.get(`/review/get-reviews-of-product/${productId}`).then((res) => {
      setListReviews(res.data);
    });
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const addReview = () => {
    if (!user) {
      navigate("/login");
    } else {
      if (review) {
        axios
          .post(`/review/create-review`, {
            product_id: productId,
            rating,
            review_text: review,
          })
          .then(() => {
            fetchReviews();
            setReview("");
            setRating(0);
          });
      }
    }
  };

  const removeReview = (id) => {
    axios.delete(`/review/delete-review/${id}`).then(() => {
      fetchReviews();
    });
  };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        i < rating ? (
          <FaStar size={30} color={"#ffc107"} />
        ) : (
          <FaStar size={30} color={"#e4e5e9"} />
        )
      );
    }
    return stars;
  };

  return (
    <div className="review-container">
      <div className="input-review">
        <p>Score</p>
        <div className="score">
          <Rating setRating={setRating} rating={rating} />
        </div>
        <textarea
          type="text"
          placeholder="Write a review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button onClick={addReview}>Comment</button>
      </div>
      <div className="list-reviews">
        <h2>List Reviews</h2>

        {listReviews.length > 0 ? (
          <div className="reviews">
            {listReviews.map((review) => (
              <div className="review" key={review.review_id}>
                <div className="info-user">
                  <div className="user-review">
                    <img src={avatar} alt="avatar-user" />
                    <p>{review.full_name}</p>
                  </div>
                  <div className="score">
                    {renderStars(review.rating).map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                  </div>
                  {review?.user_id === user?.data.user_id && (
                    <BsFillTrash3Fill
                      size={20}
                      className="delete"
                      onClick={() => removeReview(review.review_id)}
                    />
                  )}
                </div>

                <p className="review-text">{review.review_text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text">No reviews</p>
        )}
      </div>
    </div>
  );
};

export default Review;
