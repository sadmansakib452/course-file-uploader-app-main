"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Editor } from "@/components/editor";
import { Preview } from "@/components/preview";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ChapterDescriptionForm = ({ initialData }) => {
  const [isEditing, setEditing] = useState(false);
  const { control, getValues, setValue } = useFormContext();

  

  const toggleEdit = () => setEditing((current) => !current);

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter description
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            !isEditing && (
              <>
                <Pencil className="h-4 w-4 mr-2" />
                Edit description
              </>
            )
          )}
        </Button>
      </div>
      {!isEditing && (
        <div
          className={cn(
            "text-sm mt-2",
            !getValues("description") && "text-slate-500 italic"
          )}
        >
          {!getValues("description") && "No description"}
          {getValues("description") && (
            <Preview value={getValues("description")} />
          )}
        </div>
      )}
      {isEditing && (
        <div className="space-y-4 mt-4">
          <Controller
            name="description"
            control={control}
            defaultValue={initialData?.description || ""}
            render={({ field }) => (
              <div>
                <Editor {...field} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ChapterDescriptionForm;
