import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { CodeSnippet } from "../components/code-snippet";
import { PageLayout } from "../components/page-layout";
import { getPublicResource } from "../services/message.service";

export const PublicPage = () => {
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState("");

  const { isAuthenticated, user } = useAuth0();


  useEffect(() => {
    let isMounted = true;

    const getMessage = async () => {
      if (!isAuthenticated) {
        setUserInfo(JSON.stringify("Guest", null, 2));
        return;
      } else {
        setUserInfo(JSON.stringify(user, null, 2));
      }

      const { data, error } = await getPublicResource();

      if (!isMounted) {
        return;
      }

      if (data) {
        setMessage(JSON.stringify(data, null, 2));
      }

      if (error) {
        setMessage(JSON.stringify(error, null, 2));
      }
    };

    getMessage();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PageLayout>
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Public Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              This page retrieves a <strong>public message</strong> from an
              external API.
            </span>
            <span>
              <strong>Any visitor can access this page.</strong>
            </span>
          </p>
          { isAuthenticated &&
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
          </div>}
          <CodeSnippet title="User Info" code={userInfo} />
          <CodeSnippet title="Public Message" code={message} />
        </div>
      </div>
    </PageLayout>
  );
};
