import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../store/actions/user.actions";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Loader from "../../utils/loader";

const ResetPasswordPage = () => {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(resetPassword(token, password));
  };

  useEffect(() => {
    if (notifications && notifications.success) {
      navigate("/sign_in");
    }
    setLoading(false);
  }, [notifications, navigate]);

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="token"
            label="Token"
            type="text"
            id="token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="New Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Reset Password
          </Button>
          {loading && <Loader />}
        </form>
      </Box>
    </Container>
  );
};

export default ResetPasswordPage;
