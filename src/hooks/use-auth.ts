import React from "react";
import { AuthContext } from "src/contexts/auth-context";

export const useAuth = () => React.useContext(AuthContext);
