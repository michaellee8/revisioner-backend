**Title**
----
  Additional request query parameters for allowing authorized access


*  **URL Params**

   **Optional:**

   `userFirebaseId=[string]`
   `userFirebaseToken=[string]`


* **Error Response:**

  * **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Invalid auth data" }`


* **Sample Call:**

  ```
  axios.get('/<realUrl>', {
    params: {
      userFirebaseId: <realId>,
      userFirebaseToken: <realToken>
    }
  })
  ```

* **Notes:**

  You may ignore the authorization process by not passing those URL params. If anyone of `userFirebaseId` or `userFirebaseToken` is not passed, the subsequent response will return show any user-specified content.
