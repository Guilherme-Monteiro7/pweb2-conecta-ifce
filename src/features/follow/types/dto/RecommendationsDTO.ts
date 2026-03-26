export type RecommendationsDTO ={
  items: Array<{
    name: ReactNode
    id: string
    firstname: string
    lastName:string
    handle: string
    avatarUrl:string
    campus: {
      id: string
      name: string
    }
    course?: string
    reason: "mutual_friends" | "same_campus" | "discover"
  }>
}
