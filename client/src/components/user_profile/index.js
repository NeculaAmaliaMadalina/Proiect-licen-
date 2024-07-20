import React from "react";
import ProfileLayout from "../../hoc/user_profile";
import History from "../../utils/history";

const UserProfile = ({ users }) => {
  return (
    <ProfileLayout title="Istoricul comenzilor">
      <div className="user_info_panel">
        {users.data.history ? (
          <div className="user_info_panel">
            <div className="user_product_block_wrapper">
              <History history={users.data.history} />
            </div>
          </div>
        ) : null}
      </div>
    </ProfileLayout>
  );
};

export default UserProfile;
