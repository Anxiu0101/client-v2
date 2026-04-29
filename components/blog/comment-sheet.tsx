import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {PostBlog} from "velite-generate";

type PostInfoSheetProps = { post: PostBlog }

export default function BlogInfoSheet(props: PostInfoSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Post Detail</Button>
            </SheetTrigger>
            <SheetContent showCloseButton={false}>
                <SheetHeader>
                    <SheetTitle>Information</SheetTitle>
                    <SheetDescription>
                        {props.post.description}
                    </SheetDescription>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-name">Name</Label>
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="sheet-demo-username">Username</Label>
                        <Input aria-label={"username"} id="sheet-username" defaultValue="@peduarte" />
                    </div>
                </div>
                <SheetFooter>
                    <Button type="submit">Save changes</Button>
                    <SheetClose asChild>
                        <Button variant="outline">Close</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
