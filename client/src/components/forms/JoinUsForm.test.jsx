import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import JoinUsForm from "./JoinUsForm";
import { HelmetProvider } from "react-helmet-async";

describe("JoinUsForm Component", () => {
  it("should render the form with all required fields", () => {
    // We wrap it in a mock component if it requires context, but JoinUsForm is largely presentational
    render(
      <HelmetProvider>
        <JoinUsForm />
      </HelmetProvider>
    );

    // Verify main fields are present
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    
    // Verify submit button is present
    expect(screen.getByRole("button", { name: /submit application/i })).toBeInTheDocument();
  });
});
