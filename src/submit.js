// submit.js
import { Button } from "./components/ui/button";
import { useStore } from "./store";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "sonner";

export const SubmitButton = () => {
    const { nodes, edges } = useStore();
    const [result, setResult] = useState(null);

    const onSubmit = async() => {
        console.log('ran');
        
        try {
            const res = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({nodes, edges})
            })
            if(res.ok) {
                const data = await res.json();
                if(data?.num_nodes !== undefined && data?.num_edges !== undefined && data?.is_dag !== undefined) {
                    setResult(data);
                    console.log(data);
                    toast.success('Successfully submitted');
                }
            }
            else {
                toast.warning('something went wrong please try again, or check your internet connectivity')
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={'bg-green-500 text-white font-bold'}
                        onClick={onSubmit}
                        disabled={nodes.length < 2}
                    >
                        Submit
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className={'bg-white'}>
                    <AlertDialogHeader>
                    <AlertDialogTitle>Submitted</AlertDialogTitle>
                    <AlertDialogDescription>
                        Congratulations you have made it, great work. From here we will let you know when your automation pipeline hits to the production.
                    </AlertDialogDescription>
                    {result && <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                        <h2 className="mb-3 text-lg font-semibold text-gray-800">
                            Pipeline Summary
                        </h2>

                        <div className="space-y-2 text-sm text-gray-700">
                            <div className="flex justify-between">
                            <span>Total Nodes</span>
                            <span className="font-medium">{result.num_nodes}</span>
                            </div>

                            <div className="flex justify-between">
                            <span>Total Edges</span>
                            <span className="font-medium">{result.num_edges}</span>
                            </div>

                            <div className="flex justify-between items-center">
                            <span>Valid DAG</span>
                            <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                                result.is_dag
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                            >
                                {result.is_dag ? "Yes" : "No"}
                            </span>
                            </div>
                        </div>
                    </div>}

                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel>Continue</AlertDialogCancel>
                    {/* <AlertDialogAction>Continue</AlertDialogAction> */}
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
