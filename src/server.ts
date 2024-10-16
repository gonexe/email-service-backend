import app from './app';
import envVars from './config/validateEnv';

const port = envVars.PORT;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
