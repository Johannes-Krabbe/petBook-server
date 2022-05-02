# Petbook cyber security measures

## Browser (External Actor)

### XSS Attacks

Description:
A hacker could craft malicious code and insert it, for example in a post. That could lead to a leak of user-data and could even gain access to user-accounts by extracting the session cookie.

Mitigation:
React prevents by default XSS attacks if one avoids using react's `dangerouslySetInnerHTML`. 

### Broken Access Control

Description:
If a hacker could log in as any user, he could create new posts and new pets in the name of someone else.

Mitigation:
A cookie based session system. One has to be logged in (have a valid jwt token in a cookie) to create posts / pets.


## Backend API

### CSRF Attacks (NOT MITIGATED YET!)

Description: A Hacker could craft a malicious link and use the session cookie to create pets or posts.

### Cryprographic Failures

Description:
A hacker could see login information or session cookies and gain access to user accounts.

Mitigation:
Enforced https. All requests are encoded and send via https.

Secure Password storing. All passwords are hashed, in combination with a salt, with an ecrypt function, so even if someone gains access to the database, they can't see the passwords in plain text and therefore can't login.

### Injection

Description: 
A hacker could craft malicious SQL queries and insert them, for example in the login process. He could then gain access to the database and read, write or delete entries.

Mitigation:
Parameterized queries. The queries are all predefined and user inputs only get inserted with parameters. 


## Google Cloud

### Server Access

Description:
If a hacker could gain access to the google cloud admin account, he could shut down the application and gain access to all data stored in the database or alter the app in any way that would benefit them.

Mitigation:
Two factor authentication with a yubi-key for the google account and secure password.

Vulnerability:
A hacker could gain access to my (cloud) password manager. After that he could steal my yubi-key.

### GitHub

Description:
The main branch gets automatically deployed, if a hacker has access to my account, he could alter the app in any way.

Mitigation:
Two factor authentication with a yubi-key for the google account and a secure password.

Vulnerability:
A hacker could gain access to my (cloud) password manager. After that he could steal my yubi-key.













