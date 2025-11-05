import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const SetupEmployees = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleSetup = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('setup-employees');
      
      if (error) throw error;
      
      setResults(data.results);
      toast({
        title: "Setup Complete",
        description: "All employee accounts have been created!",
      });
    } catch (error: any) {
      toast({
        title: "Setup Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Employee Setup</CardTitle>
          <CardDescription>
            Click the button below to automatically create all employee accounts and assign roles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleSetup} disabled={loading} className="w-full">
            {loading ? "Setting up..." : "Create All Employee Accounts"}
          </Button>

          {results.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="font-semibold">Results:</h3>
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded ${
                    result.success ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                  }`}
                >
                  <p className="font-medium">{result.email}</p>
                  {result.success ? (
                    <p className="text-sm">✓ Created successfully</p>
                  ) : (
                    <p className="text-sm">✗ {result.error}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 p-4 bg-muted rounded">
            <h3 className="font-semibold mb-2">Accounts to be created:</h3>
            <ul className="space-y-1 text-sm">
              <li>• awismen@vulntech.com (employee)</li>
              <li>• bobbacker@vulntech.com (employee)</li>
              <li>• carolsmith@vulntech.com (employee)</li>
              <li>• admin@vulntech.com (admin)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupEmployees;
