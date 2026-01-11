import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectValue, SelectItem } from '../components/ui/select';
import { useRef, useState } from 'react';


export const BaseDialog = ({
    open,
    onOpenChange,
    onSubmit,
    title,
    description,
    showTextArea = false,
    textAreaId,
    textAreaPlaceholder,
    textAreaLabel,
    isTextAreaDisabled=false,

    showInput=false,
    inputId,
    inputPlaceholder,
    inputLabel,

    isSelectable = false,
    selectableValues=[],
    selectId,
    selectPlaceholder,
    selectableLabel,

}) => {
    const [selectedValue, setSelectedValue] = useState('');
    const [input, setInput] = useState('');
    const [textArea, setTextArea] = useState('');
    const [, forceUpdate] = useState(0);

    const variableMapRef = useRef(new Map());
    const variableMap = variableMapRef.current;

    function extractVariables(input) {
      const regex = /\{\{\s*([^}]+?)\s*\}\}/g;
      const results = [];
      let match;

      while ((match = regex.exec(input)) !== null) {
        results.push(match[1]);
      }

      return results;
    }

    function synchronise(keysArray) {
      keysArray.forEach(key => {
        if (!variableMap.has(key)) {
          variableMap.set(key, "");
        }
      });
      for (const key of variableMap.keys()) {
        if (!keysArray.includes(key)) {
          variableMap.delete(key);
        }
      }
    }

    return (
        <div className='bg-white'>
            <Dialog open={open} onOpenChange={onOpenChange} >
                <DialogContent className={'bg-white'}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const variables = [];
                    for(const [key, value] of variableMap) {
                      variables.push([key, value]);
                    }
                    if(onSubmit) {
                        onSubmit(input, selectedValue, textArea, variables);
                    }
                    onOpenChange(false);
                }}
            >
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>
                            {description}
                        </DialogDescription>
                    </DialogHeader>
                    <div>

                        {showInput &&
                            <div className='mt-4 flex flex-col gap-4'>
                                <Label htmlFor={inputId}>{inputLabel}</Label>
                                <Input value={input} onChange={(e) => setInput(e.target.value)} id={inputId} placeholder={inputPlaceholder} />
                            </div>
                        }

                        {isSelectable && selectableValues.length > 0 && 
                            <div className='flex flex-col gap-4 mt-4'>
                                <div className='text-sm font-semibold'>{selectableLabel}</div>
                                <Select value={selectedValue} onValueChange={(value) => setSelectedValue(value)}>
                                    <SelectTrigger id={selectId}>
                                        <SelectValue placeholder={selectPlaceholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectableValues.map((value, index) => (
                                            <SelectItem key={index} value={value}>{value}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        }

                        {showTextArea && (!isSelectable || (selectedValue === 'POST' || selectedValue === 'PUT' || selectedValue === 'PATCH' || selectableLabel === 'Select models from here')) &&
                            <div className='flex flex-col gap-4 h-full mt-4'>
                                <Label htmlFor={textAreaId}>{textAreaLabel}</Label>
                                <Textarea
                                    id={textAreaId}
                                    value={textArea}
                                    onChange={(e) => {
                                      const keys = extractVariables(e.target.value);
                                      synchronise(keys);
                                      setTextArea(e.target.value);
                                      forceUpdate(x => x + 1)
                                    }}
                                    placeholder={textAreaPlaceholder}
                                    rows={3}
                                    className="resize-none overflow-hidden"
                                    onInput={(e) => {
                                        const el = e.currentTarget
                                        el.style.height = "auto"
                                        el.style.height = `${el.scrollHeight}px`
                                    }}
                                    disabled={isTextAreaDisabled}
                                />
                            </div>
                        }

                        <div className='mt-5 flex flex-col gap-2'>
                          {[...variableMap.entries()].map(([key, value]) => (
                            <div key={key} className="flex items-center gap-3">
                              <label className="w-32 font-medium">{key}</label>

                              <input
                                className="border px-2 py-1 rounded w-full"
                                value={value}
                                onChange={e => {
                                  variableMap.set(key, e.target.value);
                                  forceUpdate(x => x + 1);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        
                    </div>

                    <Button 
                        className={'mt-5'}
                        variant={'outline'}
                        type={'submit'}
                    >Done</Button>
            </form>
                </DialogContent>
        </Dialog>
        </div>
    )
}
