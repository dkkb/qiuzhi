import {Dialog, DialogTrigger} from "../../Components/dialog.tsx";

interface NewSubscribeProps {
    trigger: any
    showNewSubscribe: boolean
    setShowNewSubscribe: (value: boolean) => void
}

export const NewSubscribe = ({trigger, showNewSubscribe, setShowNewSubscribe}: NewSubscribeProps) => {
    return (
        <Dialog open={showNewSubscribe} onOpenChange={setShowNewSubscribe}>
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
        </Dialog>
    )
}