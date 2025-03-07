# mini-spam-detector

little tool to gauge spam content

## Running Instructions Local

1. Ensure you have a Spam Assassin server running.
2. Create an env with following attributes
   ```
   SA_HOST={Your Spam Assassin Host IP}
   SA_PORT={Your Spam Assassin Port}
   ```
3. Make sure you have Node.js version 23.9.0 installed.
4. Install the necessary dependencies:
   ```sh
   npm i
   ```
5. Start the application:
   ```sh
   npm start
   ```

## Running it via Docker

1. Build the image

```
docker build -t mini-spam-detector .
```

2. Run the image

Pass your envs for Spam Assassin Server

```
docker run -p 3000:3000 -e SA_HOST=your_spamassassin_host -e SA_PORT=your_spamassassin_port mini-spam-detector
```

If you are having issues getting the container to connect to the server
override the host to use `host.docker.internal` if runnning image on same machine as server.

## Send your JSON Payload to Check for Spam

Route for checking Spam `{YOUR_APP_NAME}/check-email`

```
    {
      "subject": "This is my not spammy email",
      "body": "<strong>Here is the HTML part of the email</strong>"
    },
```

And receive response as

```
{
	"result": {
		"code": 0,
		"message": "EX_OK",
		"spam": true,
		"score": 1000.2
	}
}
```
